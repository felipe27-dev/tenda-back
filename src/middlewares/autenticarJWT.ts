// src/middlewares/autenticarJWT.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";

// Interface para tipar o payload do token
export interface JwtPayload {
  id: string;
  email: string;
  papel: "ADMIN" | "CLIENTE";
}

// Extensão do Request para incluir o usuário autenticado
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function autenticarJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  // Verifica se o header Authorization foi enviado
  if (!authHeader) {
    res.status(401).json({ mensagem: "Token não fornecido." });
    return;
  }

  // Espera o formato: Bearer TOKEN
  const [, token] = authHeader.split(" ");

  if (!token) {
    res.status(401).json({ mensagem: "Token mal formatado." });
    return;
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, config.secret) as JwtPayload;

    // Adiciona as informações do usuário à requisição
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      mensagem: "Token inválido ou expirado.",
    });
  }
}
