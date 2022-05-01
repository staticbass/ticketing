import nats, {Stan} from 'node-nats-streaming'

export class NatsClient {
  private _client?: Stan

  get client() {
    if (!this._client) {
      throw new Error('client is not connected')
    }
    return this._client
  }

  public connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url })

    return new Promise((resolve, reject) => {
      this._client!.on('connect', () => resolve())
      this._client!.on('error', (err) => reject(err))
    })
  }
}

export const natsClient = new NatsClient()