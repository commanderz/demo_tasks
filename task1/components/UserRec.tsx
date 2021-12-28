import Link from "next/link";
import styles from '../styles/Homde.module.css'

export default function UserRec(x1: { text: string, href: string }) {
    return (
        <div>
            {x1.text}
            <Link href={x1.href}>
                <button>Видалити</button>

            </Link>
            <Link href={x1.href}>
                <button>Редагувати</button>
            </Link>
        </div>

    )
}
