import styles from './header.module.css'
interface HeaderProps {
    title : string
}

export default function Header({title} : HeaderProps) {
    return (
        <header className={styles.header}>
            {title}
        </header>
    )
}