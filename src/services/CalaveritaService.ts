import type { CalaveritaContext } from '../types/index.js';
import { MCPServiceImpl } from './MCPService.js';
import { getRandomFallbackCalaverita } from '../constants/fallbacks.js';

/**
 * Comprehensive service for generating calaberitas with fallback support
 * Handles MCP integration and graceful degradation to local content
 */
export class CalaveritaService {
  private mcpService: MCPServiceImpl;
  private mcpAvailable: boolean | null = null;
  private lastAvailabilityCheck: number = 0;
  private readonly availabilityCheckInterval = 30000; // 30 seconds

  constructor(mcpService?: MCPServiceImpl) {
    this.mcpService = mcpService || new MCPServiceImpl();
  }

  /**
   * Generate a calaberita with automatic fallback to local content
   */
  async generateCalaverita(context: CalaveritaContext): Promise<string> {
    // Check if we should try MCP service
    if (await this.shouldUseMCP()) {
      try {
        const calaberita = await this.mcpService.generateCalaverita(context);
        
        // Mark MCP as available on successful generation
        this.mcpAvailable = true;
        this.lastAvailabilityCheck = Date.now();
        
        return calaberita;
      } catch (error) {
        console.warn('MCP calaberita generation failed, using fallback:', error);
        
        // Mark MCP as unavailable
        this.mcpAvailable = false;
        this.lastAvailabilityCheck = Date.now();
      }
    }

    // Use fallback content
    return this.getFallbackCalaverita(context);
  }

  /**
   * Get fallback calaberita based on context
   */
  private getFallbackCalaverita(context: CalaveritaContext): string {
    switch (context.type) {
      case 'selection':
        return getRandomFallbackCalaverita('selection', context.playerCharacter);
      
      case 'victory':
        return getRandomFallbackCalaverita('victory', context.playerCharacter, context.computerCharacter);
      
      case 'defeat':
        return getRandomFallbackCalaverita('defeat');
      
      default:
        return getRandomFallbackCalaverita('selection', context.playerCharacter);
    }
  }

  /**
   * Determine if we should attempt to use MCP service
   */
  private async shouldUseMCP(): Promise<boolean> {
    const now = Date.now();
    
    // If we haven't checked recently or don't know the status, check availability
    if (this.mcpAvailable === null || 
        (now - this.lastAvailabilityCheck) > this.availabilityCheckInterval) {
      
      try {
        this.mcpAvailable = await this.mcpService.isAvailable();
        this.lastAvailabilityCheck = now;
      } catch (error) {
        console.warn('MCP availability check failed:', error);
        this.mcpAvailable = false;
        this.lastAvailabilityCheck = now;
      }
    }

    return this.mcpAvailable === true;
  }

  /**
   * Force a refresh of MCP service availability
   */
  async refreshMCPAvailability(): Promise<boolean> {
    try {
      this.mcpAvailable = await this.mcpService.isAvailable();
      this.lastAvailabilityCheck = Date.now();
      return this.mcpAvailable;
    } catch (error) {
      console.warn('MCP availability refresh failed:', error);
      this.mcpAvailable = false;
      this.lastAvailabilityCheck = Date.now();
      return false;
    }
  }

  /**
   * Get current MCP service status
   */
  getMCPStatus(): { available: boolean | null; lastChecked: number } {
    return {
      available: this.mcpAvailable,
      lastChecked: this.lastAvailabilityCheck
    };
  }

  /**
   * Preload a calaberita for better performance (fire and forget)
   */
  preloadCalaverita(context: CalaveritaContext): void {
    // Fire and forget - don't await this
    this.generateCalaverita(context).catch(error => {
      console.debug('Preload calaberita failed (expected):', error);
    });
  }
}

// Export a default instance
export const calaveritaService = new CalaveritaService();