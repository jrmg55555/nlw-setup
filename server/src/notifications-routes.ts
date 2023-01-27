import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey = 'BPUbE8FEoZfqUrxMwEG-TvsBJ9keFm1HgaPzzYrhL5QeZK-iNua4re_TyMVQ329ZVOfsnwoVAhkzFgdgBcEVQpg'
const privateKey = '3l-CvMGuUQV28QFSTb2KpXjemuJwNVdHNd5JfvycbXM'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey
)

export async function notificationsRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey
    }
  })

  app.post('/push/register', (request, reply) => {
    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'hello do backend')
    }, 5000);


    return reply.status(201).send()
  })
}