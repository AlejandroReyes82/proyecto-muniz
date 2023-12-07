'use client'
import { redirect, useRouter, usePathname } from 'next/navigation'
import { useCookies } from 'next-client-cookies'
import { DosificacionIcon, LogOutIcon, MateriasIcon, UserIcon } from './Icons'
import Link from 'next/link'

export default function Sidebar() {
    const router = useRouter()
    const cookies = useCookies()
    const user = cookies.get('usuario')

    if (!user) {
        redirect('/')
    }

    const { tipo, nombre, apellido } = JSON.parse(user)
    const pathname = usePathname()

    function logout() {
        cookies.remove('usuario')
    }

    const navigationDocente = [
        {
            href: '/dashboard/dosificaciones',
            name: 'Dosificaciones',
            icon: DosificacionIcon()
        }
    ]

    const navigationAdmin = [
        {
            href: '/dashboard/dosificaciones',
            name: 'Dosificaciones',
            icon: DosificacionIcon()
        },
        {
            href: '/dashboard/materias',
            name: 'Materias',
            icon: MateriasIcon()
        },
        {
            href: '/dashboard/usuarios',
            name: 'Usuarios',
            icon: UserIcon()
        }
    ]


    const navsFooter = [
        {
            href: '/login',
            name: 'Logout',
            icon: LogOutIcon()
        }
    ]

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full h-full border-r space-y-8 sm:w-80">
                <div className="flex flex-col h-full">
                    <div className='h-40 flex items-center px-8'>
                        <a href='/dashboard' className='flex-none'>
                            {/* eslint-disable-next-line @next/next/no-img-element*/}
                            <img src="http://www.itparral.edu.mx/wp-content/themes/tec-parral/assets/img-gobierno/pleca-tecparral.svg" width={140} className="mx-auto" alt="logo"/>
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="px-4 text-sm font-medium flex-1">
                            {
                                tipo === 'Administrador' ?
                                navigationAdmin.map((item, idx) => (
                                    <li key={idx}>
                                        <Link href={item.href} legacyBehavior>
                                            <a className={`link ${pathname === item.href ? 'text-blue-500' : ''} flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-300`}>
                                                <div>{item.icon}</div>
                                                {item.name}
                                            </a>
                                        </Link>
                                    </li>
                                )) :
                                navigationDocente.map((item, idx) => (
                                    <li key={idx}>
                                        <Link href={item.href} legacyBehavior>
                                        <a className={`link ${pathname === item.href ? 'text-blue-500' : ''} flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-300`}>
                                                <div>{item.icon}</div>
                                                {item.name}
                                            </a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {
                                    navsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-gray-300 duration-150" onClick={logout}>
                                                <div>{item.icon}</div>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="py-4 px-4 border-t items-center justify-center text-center">
                                <div className="gap-x-4">
                                    <div>
                                        <span className="block text-lg font-semibold">{nombre} {apellido}</span>
                                        <span className="block mt-px text-xs">{tipo}</span>
                                    </div>
                                </div>
                            </div>
                    </div >
                </div>
            </nav>
        </>
    );
};
