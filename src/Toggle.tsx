import styles from './toggle.module.css';

export default function Toggle() {
  return (
    <label className={styles.toggleButton}>
      <input type="checkbox"/>
    </label>
  )
}