#!/usr/bin/env python3
"""
Simple MCP Server for generating Calaberitas (Day of the Dead poems)
This is a basic implementation that can be used locally
"""

import json
import sys
import random
from typing import Dict, List, Any

# Calaberitas templates for different contexts
CALABERITA_TEMPLATES = {
    "selection": [
        "En el reino de los muertos,\nTres guerreros han de luchar,\nCatrina, Calavera, Mariachi,\nEligen su destino final.",
        "Bajo la luna de octubre,\nLos espíritus despiertan,\nCon flores de cempasúchil,\nSus historias nos cuentan.",
        "En la noche de los muertos,\nDanza la tradición,\nTres personajes sagrados,\nBuscan la perfección."
    ],
    "victory": [
        "¡Victoria para {winner}!\nLos ancestros celebran,\nCon música y alegría,\nSus triunfos veneran.",
        "En el campo de batalla,\n{winner} ha triunfado,\nLos espíritus aplauden,\nSu valor ha demostrado.",
        "¡Que viva {winner}!\nGrita la multitud,\nEn el Día de los Muertos,\nReina la virtud."
    ],
    "defeat": [
        "No hay derrota en la muerte,\nSolo un nuevo comienzo,\nLos espíritus nos enseñan,\nQue todo es aprendizaje.",
        "Aunque {loser} no ganó,\nSu espíritu permanece,\nEn el reino de los muertos,\nTodo renace.",
        "La muerte no es el final,\nEs solo una transición,\n{loser} volverá más fuerte,\nCon nueva determinación."
    ]
}

CHARACTER_NAMES = {
    "catrina": "La Catrina",
    "calavera": "El Calavera", 
    "mariachi": "El Mariachi"
}

def generate_calaberita(context_type: str = "selection", **kwargs) -> str:
    """Generate a calaberita based on context"""
    templates = CALABERITA_TEMPLATES.get(context_type, CALABERITA_TEMPLATES["selection"])
    template = random.choice(templates)
    
    # Replace placeholders with actual character names
    if "winner" in kwargs:
        winner = CHARACTER_NAMES.get(kwargs["winner"], kwargs["winner"])
        template = template.replace("{winner}", winner)
    
    if "loser" in kwargs:
        loser = CHARACTER_NAMES.get(kwargs["loser"], kwargs["loser"])
        template = template.replace("{loser}", loser)
    
    return template

def handle_mcp_request(request: Dict[str, Any]) -> Dict[str, Any]:
    """Handle MCP protocol requests"""
    method = request.get("method", "")
    params = request.get("params", {})
    
    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": request.get("id"),
            "result": {
                "tools": [
                    {
                        "name": "generate_calaberita",
                        "description": "Generate a Day of the Dead poem (calaberita)",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "context_type": {
                                    "type": "string",
                                    "enum": ["selection", "victory", "defeat"],
                                    "description": "Type of calaberita to generate"
                                },
                                "winner": {
                                    "type": "string",
                                    "description": "Winning character name"
                                },
                                "loser": {
                                    "type": "string", 
                                    "description": "Losing character name"
                                }
                            },
                            "required": ["context_type"]
                        }
                    }
                ]
            }
        }
    
    elif method == "tools/call":
        tool_name = params.get("name")
        arguments = params.get("arguments", {})
        
        if tool_name == "generate_calaberita":
            try:
                calaberita = generate_calaberita(**arguments)
                return {
                    "jsonrpc": "2.0",
                    "id": request.get("id"),
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": calaberita
                            }
                        ]
                    }
                }
            except Exception as e:
                return {
                    "jsonrpc": "2.0",
                    "id": request.get("id"),
                    "error": {
                        "code": -32000,
                        "message": f"Error generating calaberita: {str(e)}"
                    }
                }
    
    elif method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": request.get("id"),
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": "calaberita-generator",
                    "version": "1.0.0"
                }
            }
        }
    
    # Default response for unknown methods
    return {
        "jsonrpc": "2.0",
        "id": request.get("id"),
        "error": {
            "code": -32601,
            "message": f"Method not found: {method}"
        }
    }

def main():
    """Main MCP server loop"""
    try:
        for line in sys.stdin:
            if not line.strip():
                continue
                
            try:
                request = json.loads(line.strip())
                response = handle_mcp_request(request)
                print(json.dumps(response))
                sys.stdout.flush()
            except json.JSONDecodeError:
                error_response = {
                    "jsonrpc": "2.0",
                    "id": None,
                    "error": {
                        "code": -32700,
                        "message": "Parse error"
                    }
                }
                print(json.dumps(error_response))
                sys.stdout.flush()
            except Exception as e:
                error_response = {
                    "jsonrpc": "2.0", 
                    "id": None,
                    "error": {
                        "code": -32000,
                        "message": f"Internal error: {str(e)}"
                    }
                }
                print(json.dumps(error_response))
                sys.stdout.flush()
                
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print(f"Server error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()