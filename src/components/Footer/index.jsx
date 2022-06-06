import React from 'react'
import styles from "./footer.module.css"
const Footer = () => {
  return (
    <footer className={styles.footer_image}>
      
      <p className={styles.footer}>
        Copyright @{new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer