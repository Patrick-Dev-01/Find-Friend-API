import { FastifyRequest, FastifyReply } from 'fastify';

export async function refreshToken(request: FastifyRequest, reply: FastifyReply){
    await request.jwtVerify();

    // new Token
    const token = await reply.jwtSign({
        sign: {
            id: String(request.user.sub)
        }
    });

    // Refresh Token
    const refreshToken = await reply.jwtSign({
        sign: {
            sub: String(request.user.sub),
            expiresIn: '5d'
        }
    });

    return reply.setCookie('refresh', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
    }).status(200).send({ token });
}