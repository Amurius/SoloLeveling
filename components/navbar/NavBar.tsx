"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar, Image } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useMutation, useQuery } from 'react-query';
import { Logout, getCookies } from '@/app/actions/action';
import { useEffect, useState } from 'react';
import { error } from 'console';
import { randomInt } from 'crypto';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    server_getCookies()
  }, [])
  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      if (res.error) {
      }
      else {
        setUser(res);

      }
    },
  })
  useEffect(() => {
    var links = document.querySelectorAll('a')
    links.forEach((link) => {
      if (pathname == "/accueil" && link.getAttribute('href') == "/accueil") {
        link.style.fontWeight = 'bold'
        link.style.textShadow = 'white 1px 0 20px'
      }
      else if (pathname != "/accueil" && link.getAttribute('href')?.includes(pathname)) {
        link.style.fontWeight = 'bold'
        link.style.textShadow = 'white 1px 0 20px'
      } else {
        link.style.fontWeight = '100'
        link.style.textShadow = 'none'
      }
    })
  }, []);
  return (
    <>
      <Navbar isBlurred isBordered className='h-20 bg-black sticky'>
        <NavbarBrand>
          <Link className=" text-inherit text-purple-600 lg:text-5xl sm:text-4xl text-3xl font-bold" href="/accueil#">SoloLeveling</Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4 " justify="center">
          <NavbarItem>
            <Link href="/accueil" className='text-purple-200 lg:text-3xl md:text-2xl text-xl'>Accueil</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/accueil/classes" className='text-purple-200 lg:text-3xl md:text-2xl text-xl font-thin'>
              Classes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-purple-200 lg:text-3xl md:text-2xl text-xl' href="/accueil/monstres">
              Monstres
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          {
            user != null && user.admin == 1 ?
              <>
                <Link className='text-purple-200 lg:text-3xl md:text-2xl text-xl' href="/administration">
                  Administration
                </Link>
              </>
              :
              <>
              </>
          }
          {user != null ?
            <>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    showFallback
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="default"
                    size="lg"
                    src={user.pp}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="text-purple-400 lg:text-3xl md:text-2xl text-xl">Signed in as {user.prenom}</p>
                  </DropdownItem>
                  <DropdownItem key="personnages">
                    <Link className=' lg:text-2xl md:text-xl text-lg text-purple-100 w-full' href='/accueil' >
                      Mon Compte
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="team_settings">
                    <Link className=' lg:text-2xl md:text-xl text-lg text-purple-100 w-full' href='/accueil/user' >
                      Mes Personnages
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    <Link className='lg:text-2xl md:text-xl text-lg w-full' href='/accueil' color='danger' onPress={() => Logout()}>
                      Logout
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
            :
            <>
              <Link className='text-purple-200 lg:text-3xl md:text-2xl text-xl' href="/accueil/signin">
                Sing Up
              </Link>
              <Link className='text-purple-200 lg:text-3xl md:text-2xl text-xl' href="/accueil/login">
                Login
              </Link>
            </>
          }
        </NavbarContent>
      </Navbar>
    </>
  );
}