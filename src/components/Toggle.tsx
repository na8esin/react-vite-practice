import styles from './toggle.module.css';

export default function Toggle({onToggle}: {onToggle: () => void}){
  return (
    <label className={styles.toggleButton}>
      <input type="checkbox" onChange={onToggle} />
    </label>
  )
}