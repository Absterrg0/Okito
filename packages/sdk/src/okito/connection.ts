import { Connection, ConnectionConfig } from "@solana/web3.js";
import { OkitoNetwork } from "../types/config";

/**
 * Connection manager singleton that handles Solana RPC connections efficiently
 */
class ConnectionManager {
    private static instance: ConnectionManager;
    private connections: Map<string, Connection> = new Map();
    
    private constructor() {}

    public static getInstance(): ConnectionManager {
        if (!ConnectionManager.instance) {
            ConnectionManager.instance = new ConnectionManager();
        }
        return ConnectionManager.instance;
    }

    /**
     * Get or create a connection for the specified network
     * @param {OkitoNetwork} network - The network to get a connection for.
     * @param {ConnectionConfig['commitment']} commitment - The commitment level to use for the connection.
     * @return {Connection} - The connection for the specified network and commitment level.
     */
    public getConnection(
        network: OkitoNetwork, 
        commitment: ConnectionConfig['commitment'] = 'confirmed'
    ): Connection {
        const key = `${network}-${commitment}`;
        
        if (!this.connections.has(key)) {
            const config: ConnectionConfig = {
                commitment,
                confirmTransactionInitialTimeout: 60000,
                disableRetryOnRateLimit: false,
                httpHeaders: {
                    'Content-Type': 'application/json',
                },
                // Enable connection pooling
                fetch: fetch, // Use native fetch or a custom implementation
            };

            const connection = new Connection(network, config);
            this.connections.set(key, connection);
            
            console.log(`Created new connection for ${network} with ${commitment} commitment`);
        }

        return this.connections.get(key)!;
    }

    /**
     * Get connection with specific configuration
     * @param {OkitoNetwork} network - The network to get a connection for.
     * @param {ConnectionConfig} config - The configuration to use for the connection.
     * @return {Connection} - The connection for the specified network and configuration.
     */
    public getConnectionWithConfig(
        network: OkitoNetwork,
        config: ConnectionConfig
    ): Connection {
        // For custom configs, create a unique key including relevant config properties
        const configKey = JSON.stringify({
            network,
            commitment: config.commitment,
            timeout: config.confirmTransactionInitialTimeout,
            disableRetryOnRateLimit: config.disableRetryOnRateLimit
        });

        if (!this.connections.has(configKey)) {
            const connection = new Connection(network, config);
            this.connections.set(configKey, connection);
        }

        return this.connections.get(configKey)!;
    }

    /**
     * Health check for all connections
     * @return {Promise<Map<string, boolean>>} - A map of connection keys to their health status.
     */
    public async healthCheck(): Promise<Map<string, boolean>> {
        const healthStatus = new Map<string, boolean>();
        
        for (const [key, connection] of this.connections.entries()) {
            try {
                await connection.getSlot();
                healthStatus.set(key, true);
            } catch (error) {
                healthStatus.set(key, false);
                console.warn(`Connection ${key} failed health check:`, error);
            }
        }
        
        return healthStatus;
    }

    /**
     * Clean up unhealthy connections
     * @return {Promise<void>} - A promise that resolves when the unhealthy connections are cleaned up.
     */
    public async cleanupUnhealthyConnections(): Promise<void> {
        const healthStatus = await this.healthCheck();
        
        for (const [key, isHealthy] of healthStatus.entries()) {
            if (!isHealthy) {
                console.log(`Removing unhealthy connection: ${key}`);
                this.connections.delete(key);
            }
        }
    }

    /**
     * Dispose all connections (useful for cleanup)
     * @return {void} - Disposes all connections.
     */
    public dispose(): void {
        this.connections.clear();
        console.log('All connections disposed');
    }

    /**
     * Get connection statistics
     */
    public getStats(): { activeConnections: number; connectionKeys: string[] } {
        return {
            activeConnections: this.connections.size,
            connectionKeys: Array.from(this.connections.keys())
        };
    }
}

// Export singleton instance
export const connectionManager = ConnectionManager.getInstance();

// Convenience functions for common use cases
export function getConnection(
    network: OkitoNetwork, 
    commitment: ConnectionConfig['commitment'] = 'confirmed'
): Connection {
    return connectionManager.getConnection(network, commitment);
}

export function getConnectionWithConfig(
    network: OkitoNetwork,
    config: ConnectionConfig
): Connection {
    return connectionManager.getConnectionWithConfig(network, config);
}