import 'dotenv/config'

export class Config {
  get DevMode(): boolean {
    return this.getEnv('NODE_ENV') === 'test'
  }

  get StagingMode(): boolean {
    return this.getEnv('NODE_ENV') === 'staging'
  }

  get ProdMode(): boolean {
    return this.getEnv('NODE_ENV') === 'production'
  }

  get Port(): number {
    return parseInt(this.getEnv('PORT'), 10)
  }

  get MongoUrl(): string {
    return this.getEnv('MONGO_URL')
  }

  get RedisUrl(): string {
    return this.getEnv('REDIS_URL')
  }

  get JWT(): { secret: string; expiresIn: string } {
    return {
      secret: this.getEnv('JWT_SECRET'),
      expiresIn: this.getEnv('JWT_EXPIRES_IN'),
    }
  }

  protected getEnv(env: string): string {
    if (!process.env[env]) {
      throw new Error(`Missing env var ${env}`)
    }

    return process.env[env] as string
  }
}

export const config = new Config()
