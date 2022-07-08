type Props = {
  statusCode: number,
  message: string
}

export default function Error({ statusCode, message }: Props) {
  return (
    <div className="flex h-screen w-screen justify-center items-center divide-x-2 gap-x-4 fixed mb-20">
      <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
        <h1 className="font-medium">{statusCode}</h1>
      </div>
      <h1 className="pl-4">{message}</h1>
    </div>
  )
}