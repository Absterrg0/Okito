"use client"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Settings01Icon,
  PlusSignIcon,
  Delete01Icon,
  Edit01Icon,
  CheckmarkCircle01Icon,
  RefreshIcon,
  Upload01Icon,
  Copy01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons"

// Product interface based on schema
interface Product {
  id: string
  name: string
  price: number // We'll convert to BigInt when needed
  description: string
}

// Constants
const MAX_PRODUCTS = 5

interface BillingCustomizerProps {
  onBillingDataChange: (data: {
    products: Product[]
  }) => void
  initialData?: {
    products: Product[]
  }
}

export default function BillingCustomizerWidget({ 
  onBillingDataChange, 
  initialData 
}: BillingCustomizerProps) {
  const baseId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(
    initialData?.products || [
      {
        id: '1',
        name: 'Pro Plan',
        price: 0.5,
        description: 'Advanced features and unlimited API access'
      },
      {
        id: '2',
        name: 'Premium Support',
        price: 0.2,
        description: 'Priority support and dedicated account manager'
      }
    ]
  )
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({})
  const [jsonInput, setJsonInput] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const subtotal = products.reduce((sum, product) => sum + product.price, 0)

  // Apply changes to parent component
  const applyChanges = () => {
    onBillingDataChange({ products })
  }

  const addProduct = () => {
    if (products.length >= MAX_PRODUCTS) {
      toast.error(`Maximum ${MAX_PRODUCTS} products allowed`, {
        description: "Please remove a product before adding a new one.",
        duration: 4000,
      })
      return
    }

    if (newProduct.name && newProduct.price !== undefined) {
      const product: Product = {
        id: `${baseId}-${products.length + 1}`,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description || ''
      }
      const updatedProducts = [...products, product]
      setProducts(updatedProducts)
      setNewProduct({})
      onBillingDataChange({ products: updatedProducts })
      toast.success("Product added successfully", {
        description: `${product.name} has been added to your billing items.`,
        duration: 3000,
      })
    } else {
      toast.error("Missing required fields", {
        description: "Please provide both name and price for the product.",
        duration: 3000,
      })
    }
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p)
    setProducts(updatedProducts)
    setEditingProduct(null)
    onBillingDataChange({ products: updatedProducts })
  }

  const removeProduct = (id: string) => {
    const productToRemove = products.find(p => p.id === id)
    const updatedProducts = products.filter(p => p.id !== id)
    setProducts(updatedProducts)
    onBillingDataChange({ products: updatedProducts })
    
    if (productToRemove) {
      toast.success("Product removed", {
        description: `${productToRemove.name} has been removed from your billing items.`,
        duration: 3000,
      })
    }
  }

  const formatAmount = (amount: number) => `${amount.toFixed(3)} USDC`

  // Import products from JSON
  const importFromJSON = () => {
    if (!jsonInput.trim()) {
      toast.error("No JSON data provided", {
        description: "Please paste your product data in JSON format.",
        duration: 3000,
      })
      return
    }

    setIsImporting(true)
    try {
      const parsedProducts = JSON.parse(jsonInput)
      
      if (!Array.isArray(parsedProducts)) {
        toast.error("Invalid JSON format", {
          description: "JSON data must be an array of product objects.",
          duration: 4000,
        })
        setIsImporting(false)
        return
      }

      if (parsedProducts.length === 0) {
        toast.error("Empty product list", {
          description: "Please provide at least one product in your JSON data.",
          duration: 3000,
        })
        setIsImporting(false)
        return
      }

      if (parsedProducts.length > MAX_PRODUCTS) {
        toast.error(`Too many products`, {
          description: `Maximum ${MAX_PRODUCTS} products allowed. You provided ${parsedProducts.length}.`,
          duration: 4000,
        })
        setIsImporting(false)
        return
      }

      // Validate and convert products
      const validProducts: Product[] = []
      const invalidProducts: string[] = []

      parsedProducts.forEach((product, index) => {
        if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
          invalidProducts.push(`Product ${index + 1}: Missing or invalid name`)
          return
        }
        
        if (typeof product.price !== 'number' || product.price <= 0) {
          invalidProducts.push(`Product ${index + 1}: Invalid price (must be a positive number)`)
          return
        }

        validProducts.push({
          id: product.id || `${baseId}-import-${index}`,
          name: product.name.trim(),
          price: product.price,
          description: (product.description || '').trim()
        })
      })

      if (validProducts.length === 0) {
        toast.error("No valid products found", {
          description: "All products in your JSON data are invalid. Please check the format.",
          duration: 4000,
        })
        setIsImporting(false)
        return
      }

      if (invalidProducts.length > 0) {
        toast.warning(`${invalidProducts.length} invalid products skipped`, {
          description: invalidProducts.slice(0, 2).join(', ') + (invalidProducts.length > 2 ? '...' : ''),
          duration: 5000,
        })
      }

      setProducts(validProducts)
      setJsonInput('')
      setIsImportDialogOpen(false)
      onBillingDataChange({ products: validProducts })
      
      toast.success(`Successfully imported ${validProducts.length} product${validProducts.length > 1 ? 's' : ''}`, {
        description: "Your billing items have been updated.",
        duration: 3000,
      })

    } catch (error) {
      console.error('Invalid JSON format:', error)
      toast.error("Invalid JSON format", {
        description: "Please check your JSON syntax and try again.",
        duration: 4000,
      })
    }
    setIsImporting(false)
  }

  // Export current products to JSON
  const exportToJSON = () => {
    if (products.length === 0) {
      toast.error("No products to export", {
        description: "Add some products before exporting.",
        duration: 3000,
      })
      return
    }

    const jsonString = JSON.stringify(products, null, 2)
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    
    toast.success("Products exported to clipboard", {
      description: `${products.length} product${products.length > 1 ? 's' : ''} copied to clipboard.`,
      duration: 3000,
    })
  }

  // Reset to default products
  const resetToDefault = () => {
    const defaultProducts = [
      {
        id: '1',
        name: 'Pro Plan',
        price: 0.5,
        description: 'Advanced features and unlimited API access'
      },
      {
        id: '2',
        name: 'Premium Support',
        price: 0.2,
        description: 'Priority support and dedicated account manager'
      }
    ]
    setProducts(defaultProducts)
    onBillingDataChange({ products: defaultProducts })
    
    toast.success("Reset to default products", {
      description: "Your billing items have been restored to default.",
      duration: 3000,
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className="h-14 w-14   active:scale-95 crypto-glass-static"
          >
            <HugeiconsIcon icon={Settings01Icon} className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[450px] max-h-[90vh] p-0 border-primary/20 shadow-2xl crypto-glass-static backdrop-blur-xl"
          side="top"
          align="end"
          sideOffset={10}
        >
          <Card className="border-0 shadow-none flex flex-col h-full">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Billing Customizer
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={exportToJSON}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                    title={copied ? "Copied!" : "Export to JSON"}
                  >
                    <HugeiconsIcon icon={copied ? CheckmarkCircle01Icon : Copy01Icon} className="h-4 w-4" />
                  </Button>
             
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold text-foreground">Products</Label>
                    <Badge variant="secondary" className={`crypto-base ${products.length >= MAX_PRODUCTS ? 'border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400' : ''}`}>
                      {products.length}/{MAX_PRODUCTS} items
                    </Badge>
                    {products.length >= MAX_PRODUCTS && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                        <HugeiconsIcon icon={Alert01Icon} className="h-3 w-3" />
                        <span>Limit reached</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="crypto-base text-xs"
                          disabled={products.length >= MAX_PRODUCTS}
                        >
                          <HugeiconsIcon icon={Upload01Icon} className="h-3 w-3 mr-1" />
                          Import JSON
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="crypto-glass-static backdrop-blur-xl border-primary/20">
                        <DialogHeader>
                          <DialogTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                            Import Products from JSON
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">JSON Data</Label>
                            <Textarea
                              value={jsonInput}
                              onChange={(e) => setJsonInput(e.target.value)}
                              placeholder={`[
  {
    "name": "Pro Plan",
    "price": 0.5,
    "description": "Advanced features and unlimited API access"
  },
  {
    "name": "Premium Support",
    "price": 0.2,
    "description": "Priority support and dedicated account manager"
  }
]`}
                              className="crypto-base min-h-[200px] text-xs font-mono resize-none"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={importFromJSON}
                              disabled={!jsonInput.trim() || isImporting}
                              className="flex-1 crypto-button text-sm"
                            >
                              {isImporting ? (
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                  Importing...
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <HugeiconsIcon icon={Upload01Icon} className="h-4 w-4" />
                                  Import Products
                                </div>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setJsonInput('')}
                              className="crypto-base"
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="crypto-base p-3 rounded-xl">
                            <h4 className="text-sm font-semibold text-foreground mb-2">JSON Format:</h4>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>• Array of objects with <code className="bg-muted px-1 rounded">name</code>, <code className="bg-muted px-1 rounded">price</code>, and optional <code className="bg-muted px-1 rounded">description</code></div>
                              <div>• <code className="bg-muted px-1 rounded">price</code> should be a number</div>
                              <div>• Invalid entries will be skipped</div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetToDefault}
                      className="crypto-base text-xs"
                    >
                      <HugeiconsIcon icon={RefreshIcon} className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Product List - Scrollable */}
                <div className="flex-1 overflow-hidden">
                  <div className="space-y-2 h-full overflow-y-auto pr-2">
                    {products.map((product) => (
                      <div key={product.id} className="crypto-base p-3 rounded-xl">
                        {editingProduct === product.id ? (
                          <div className="space-y-2">
                            <Input
                              value={product.name}
                              onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                              placeholder="Product name"
                              className="crypto-base text-sm"
                            />
                            <Textarea
                              value={product.description || ''}
                              onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                              placeholder="Product description"
                              className="crypto-base min-h-[60px] text-sm resize-none"
                            />
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                step="0.001"
                                min="0"
                                value={product.price}
                                onChange={(e) => updateProduct(product.id, { price: parseFloat(e.target.value) || 0 })}
                                className="crypto-base flex-1 text-sm"
                              />
                              <span className="text-xs text-muted-foreground">USDC</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => setEditingProduct(null)}
                                className="flex-1 crypto-button text-xs"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeProduct(product.id)}
                                className="p-2"
                              >
                                <HugeiconsIcon icon={Delete01Icon} className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-foreground text-sm truncate">{product.name}</div>
                              {product.description && (
                                <div className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">
                                  {product.description}
                                </div>
                              )}
                              <div className="text-sm font-bold text-primary mt-1">
                                {formatAmount(product.price)}
                              </div>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingProduct(product.id)}
                                className="h-8 w-8 p-0 hover:bg-primary/10"
                              >
                                <HugeiconsIcon icon={Edit01Icon} className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeProduct(product.id)}
                                className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive"
                              >
                                <HugeiconsIcon icon={Delete01Icon} className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {products.length === 0 && (
                      <div className="crypto-base p-6 rounded-xl text-center border-2 border-dashed border-primary/30">
                        <HugeiconsIcon icon={PlusSignIcon} className="h-8 w-8 text-primary/50 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No products added yet</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">Add your first product below</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add New Product - Fixed at bottom */}
                <div className="flex-shrink-0 mt-4">
                  <div className={`crypto-base p-3 rounded-xl space-y-2 border-2 border-dashed ${products.length >= MAX_PRODUCTS ? 'border-orange-500/30 bg-orange-500/5' : 'border-primary/30'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4 text-primary" />
                        Add Product
                      </div>
                      {products.length >= MAX_PRODUCTS && (
                        <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                          <HugeiconsIcon icon={Alert01Icon} className="h-3 w-3" />
                          <span>Maximum reached</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={newProduct.name || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Product name"
                        className="crypto-base text-sm"
                      />
                      <Textarea
                        value={newProduct.description || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Product description"
                        className="crypto-base min-h-[60px] text-sm resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.001"
                          min="0"
                          value={newProduct.price || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                          placeholder="0.000"
                          className="crypto-base flex-1 text-sm"
                        />
                        <span className="text-xs text-muted-foreground">USDC</span>
                        <Button
                          size="sm"
                          onClick={addProduct}
                          disabled={!newProduct.name || newProduct.price === undefined || products.length >= MAX_PRODUCTS}
                          className="crypto-button"
                        >
                          <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-3">
                    <div className="crypto-base p-3 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-foreground">Total</span>
                        <span className="font-bold text-primary text-lg">{formatAmount(subtotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}










