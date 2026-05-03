import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import Link from "next/link"
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi"

export function Dropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="bg-black text-white p-2.5 rounded-full"><User className="size-5 stroke-[2.5]" /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Quick contact</DropdownMenuLabel>

                    {/* Email Link */}
                    <Link href="mailto:Feli@amaorganics.com">
                        <DropdownMenuItem className="cursor-pointer">
                            Send email
                            <DropdownMenuShortcut>
                                <HiOutlineMail size={18} className="text-zinc-400 group-hover:text-black transition-colors" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    {/* Phone Link - Changed 'contact:' to 'tel:' */}
                    <Link href="tel:0538616763">
                        <DropdownMenuItem className="cursor-pointer">
                            Place a call
                            <DropdownMenuShortcut>
                                <HiOutlinePhone size={18} className="text-zinc-400 group-hover:text-black transition-colors" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
