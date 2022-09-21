import { config } from '../../config'
import { Job, JobsOptions, Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

const SOME_QUEUE_NAME = 'name'

const opts: JobsOptions = {
  attempts: 50,
  backoff: 3000,
  removeOnComplete: true,
  removeOnFail: true,
}

const conn = {
  connection: new IORedis(config.RedisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  }),
  concurrency: 10,
}

const queue = async (): Promise<void> => {
  console.log('QUEUE INIT')
  const q = new Queue(SOME_QUEUE_NAME, conn)

  await q.add('job1', { foo: 'bar' }, opts)
  await q.addBulk([
    { name: 'job2', data: { foo: 'bar2' }, opts },
    { name: 'job3', data: { foo: 'bar3' }, opts },
  ])

  //await q.drain() remove all jobs
}

const worker = async (): Promise<void> => {
  console.log('WORKER INITIATED')
  const w = new Worker(
    SOME_QUEUE_NAME,
    async (job: Job) => {
      return { message: 'finished', name: job.name, data: job.data }
    },
    conn,
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  w.on('completed', (_job: Job, returnValue: any) => {
    console.log('completed', returnValue)
  })

  w.on('failed', (_job: Job, error: Error) => {
    console.error('failed', error)
  })
}

await queue()
console.log('...')
await worker()
