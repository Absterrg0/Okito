import { NFTData } from "../../types/NFT/create";
import { isValidUrl } from "../utils/sanitizers";
/**
 * Validates NFT-specific data requirements
 */
export function validateNFTData(nftData: NFTData): { isValid: boolean; errors: string[]; warnings?: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!nftData.name?.trim()) {
        errors.push('NFT name is required');
    } else if (nftData.name.length > 32) {
        errors.push('NFT name must be 32 characters or less');
    }

    if (!nftData.symbol?.trim()) {
        errors.push('NFT symbol is required');
    } else if (nftData.symbol.length > 10) {
        errors.push('NFT symbol must be 10 characters or less');
    }

    if (!nftData.imageUrl?.trim()) {
        errors.push('NFT image URL is required');
    } else if (!isValidUrl(nftData.imageUrl)) {
        errors.push('Invalid NFT image URL format');
    }

    // Optional field validation
    if (nftData.description && nftData.description.length > 1000) {
        warnings.push('NFT description is quite long, consider keeping it under 1000 characters');
    }

    if (nftData.externalUrl && !isValidUrl(nftData.externalUrl)) {
        errors.push('Invalid external URL format');
    }

    // Attributes validation
    if (nftData.attributes) {
        if (nftData.attributes.length > 20) {
            warnings.push('Many attributes detected, consider keeping under 20 for better performance');
        }
        
        nftData.attributes.forEach((attr, index) => {
            if (!attr.trait_type?.trim()) {
                errors.push(`Attribute ${index + 1}: trait_type is required`);
            }
            if (attr.value === undefined || attr.value === null || attr.value === '') {
                errors.push(`Attribute ${index + 1}: value is required`);
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings: warnings.length > 0 ? warnings : undefined
    };
}
