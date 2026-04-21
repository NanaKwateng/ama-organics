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
import Link from "next/link"
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi"

export function Dropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2">LET'S TALK <span className="w-1 h-1 bg-black rounded-full" /></Button>
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
