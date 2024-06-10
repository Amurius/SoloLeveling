import Link from "next/link";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@nextui-org/dropdown";

const items = [
    { key: "option1", name: "Option 1" },
    { key: "option2", name: "Option 2" },
    { key: "option3", name: "Option 3" }
];

export default function Home() {
    return (
        <>
            <main className=" h-screen w-full flex justify-center items-center">
                <Link href="/accueil" className=" text-4xl sm:text-5xl md:text-6xl xl:text-9xl">Accueil</Link>
            </main>
        </>
    );
}