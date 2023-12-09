import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function NewRegisterButton({ name, href }) {
  return (
    <Link href={href}>
        <Button variant="secondary">{name}</Button>
    </Link>
  )
}
