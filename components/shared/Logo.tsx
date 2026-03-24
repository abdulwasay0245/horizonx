import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-black text-white tracking-tight">
      Horizon<span className="text-blue-500">X</span>
    </Link>
  )
}