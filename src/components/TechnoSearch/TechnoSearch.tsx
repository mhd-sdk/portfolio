import { css, cx } from '@emotion/css'
import { technos } from '@ui/DevIcons/technos'
import Atropos from 'atropos/react'
import 'atropos/css'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { darkTheme, lightTheme } from '../../dim-theme'
import { useTheme } from '../../hooks/useTheme'
import gsap from 'gsap'
export const TechnoSearch = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState<
    'language' | 'library' | 'framework' | 'devops' | 'databaset'
  >('language')
  const [isAllowedToswitch, setIsAllowedToSwitch] = useState(true)

  const handleChanged = (type: string) => {
    if (!isAllowedToswitch) return
    setIsAllowedToSwitch(false)
    setSelectedType(type as 'language' | 'library' | 'framework' | 'devops')
    setTimeout(() => {
      setIsAllowedToSwitch(true)
    }, 2600)
  }
  const filteredTechnos = technos.filter(
    (techno) => techno.type === selectedType,
  )
  const { theme } = useTheme()
  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div role="tablist" className={cx('tabs tabs-boxed', styles.filter)}>
          <button
            onClick={() => handleChanged('language')}
            role="tab"
            className={cx('tab', selectedType === 'language' && 'btn-active')}>
            Langages
          </button>
          <button
            className={cx('tab', selectedType === 'library' && 'btn-active')}
            onClick={() => handleChanged('library')}>
            Libraries
          </button>
          <button
            role="tab"
            className={cx('tab', selectedType === 'framework' && 'btn-active')}
            onClick={() => handleChanged('framework')}>
            Frameworks
          </button>
          <button
            role="tab"
            className={cx('tab', selectedType === 'devops' && 'btn-active')}
            onClick={() => handleChanged('devops')}>
            Devops
          </button>
        </div>
      </div>
      <div className={styles.techList(theme)} id="tech-filtered-list">
        <AnimatePresence>
          {filteredTechnos.map((icon, index) => (
            <motion.div
              key={icon.name}
              // move up and fade in
              initial={{ transform: 'translateY(10px)', opacity: 0 }}
              animate={{
                transform: 'translateY(0px)',
                opacity: 1,
                transition: { delay: 1.2 + index * 0.1 },
              }}
              // move down and fade out
              exit={{
                transform: 'translateY(10px)',
                opacity: 0,
                transition: { delay: index * 0.1 },
              }}>
              <Atropos
                key={index}
                className={styles.atroposCard}
                shadow={false}
                highlight={false}
                onMouseEnter={() => {
                  gsap.to(`#icon-${icon.name}`, {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power1.inOut',
                  })
                }}
                onMouseLeave={() => {
                  gsap.to(`#icon-${icon.name}`, {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power1.inOut',
                  })
                }}>
                <div
                  className={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}>
                  <img
                    data-atropos-offset="5"
                    alt=""
                    className={css`
                      object-fit: cover;
                      // if theme is black, color this svg with white
                      filter: ${theme === 'black' &&
                      (icon.name === 'Symfony' || icon.name === 'Express')
                        ? 'invert(1)'
                        : 'none'};
                    `}
                    width="80%"
                    key={index}
                    src={icon.url}
                  />
                  <p
                    id={`icon-${icon.name}`}
                    data-atropos-offset={7}
                    className={styles.techName(theme)}>
                    {icon.name}
                  </p>
                </div>
              </Atropos>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

const styles = {
  techName: (theme: string) => css`
    position: absolute;
    background: ${theme === 'black'
      ? darkTheme['base-100']
      : lightTheme['base-300']};
    bottom: 20px;
    border-radius: 5px;
    padding: 0px 2px;
    opacity: 0;
  `,
  techList: (theme: string) => css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px 0px;
    border-radius: 8px;
    width: 650px;
  `,
  atroposCard: css`
    width: 90px;
    height: 80px;
    background-color: none;
  `,
  filterWrapper: css`
    bottom: 0px;
    position: sticky;
    width: 50%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  `,
  filter: css``,
  wrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
}
