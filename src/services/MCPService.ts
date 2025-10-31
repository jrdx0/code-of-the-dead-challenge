import type { CalaveritaContext, MCPService } from '../types/index.js';

/**
 * MCP Service for generating calaberitas (Day of the Dead verses)
 * Integrates with FastMCP Poetry Server for authentic Spanish poetry generation
 */
export class MCPServiceImpl implements MCPService {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;

  constructor(
    baseUrl: string = 'http://localhost:3000/mcp',
    timeout: number = 5000,
    maxRetries: number = 2
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.maxRetries = maxRetries;
  }

  /**
   * Generate a calaberita based on the provided context
   */
  async generateCalaverita(context: CalaveritaContext): Promise<string> {
    const prompt = this.buildPrompt(context);
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.makeRequest(prompt);
        if (response && response.trim()) {
          return response.trim();
        }
      } catch (error) {
        console.warn(`MCP request attempt ${attempt + 1} failed:`, error);
        
        if (attempt === this.maxRetries) {
          throw new Error(`MCP service failed after ${this.maxRetries + 1} attempts`);
        }
        
        // Exponential backoff
        await this.delay(Math.pow(2, attempt) * 1000);
      }
    }
    
    throw new Error('Failed to generate calaberita');
  }

  /**
   * Check if the MCP service is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn('MCP service availability check failed:', error);
      return false;
    }
  }

  /**
   * Build the prompt for calaberita generation based on context
   */
  private buildPrompt(context: CalaveritaContext): string {
    const basePrompt = 'Genera una calaberita tradicional mexicana del Día de los Muertos';
    
    switch (context.type) {
      case 'selection':
        if (context.playerCharacter) {
          return `${basePrompt} para animar al jugador que está considerando elegir ${context.playerCharacter}. Menciona las características del personaje de manera festiva y acogedora, máximo 2 líneas.`;
        }
        return `${basePrompt} para animar al jugador durante la selección de personaje. Debe ser festiva y acogedora, máximo 2 líneas.`;
      
      case 'victory':
        return `${basePrompt} burlesca y divertida para cuando la computadora gana contra el jugador. Debe ser juguetona, festiva y mantener el espíritu alegre del Día de los Muertos, pero no ofensiva. Máximo 2 líneas. El jugador eligió ${context.playerCharacter} y la computadora eligió ${context.computerCharacter}. Menciona los personajes de manera divertida.`;
      
      case 'defeat':
        return `${basePrompt} de celebración para cuando el jugador gana. Debe ser alegre y festiva, máximo 2 líneas.`;
      
      default:
        return `${basePrompt} general del Día de los Muertos, máximo 2 líneas.`;
    }
  }

  /**
   * Make the actual HTTP request to the MCP service
   */
  private async makeRequest(prompt: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tool: 'generate_poem',
          arguments: {
            prompt: prompt,
            style: 'calaberita',
            language: 'es',
            theme: 'dia-de-muertos',
            max_lines: 2
          }
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`MCP Error: ${data.error}`);
      }

      return data.result || data.content || '';
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Utility method for delays in retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export a default instance
export const mcpService = new MCPServiceImpl();