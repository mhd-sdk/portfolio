import { css, cx } from '@emotion/css'
import { technos } from '@ui/DevIcons/technos'
import Atropos from 'atropos/react'
import 'atropos/css'
import { useState } from 'react'
import { darkTheme, lightTheme } from '../../dim-theme'
import { useTheme } from '../../hooks/useTheme'
import gsap from 'gsap'
export const TechSearch = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState<
    'language' | 'library' | 'framework' | 'devops' | 'databaset'
  >('language')
  const filteredTechnos = technos.filter(
    (techno) => techno.type === selectedType,
  )
  const { theme } = useTheme()
  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div role="tablist" className={cx('tabs tabs-boxed', styles.filter)}>
          <button
            onClick={() => setSelectedType('language')}
            role="tab"
            className={cx('tab', selectedType === 'language' && 'btn-active')}>
            Langages
          </button>
          <button
            className={cx('tab', selectedType === 'library' && 'btn-active')}
            onClick={() => setSelectedType('library')}>
            Libraries
          </button>
          <button
            role="tab"
            className={cx('tab', selectedType === 'framework' && 'btn-active')}
            onClick={() => setSelectedType('framework')}>
            Frameworks
          </button>
          <button
            role="tab"
            className={cx('tab', selectedType === 'devops' && 'btn-active')}
            onClick={() => setSelectedType('devops')}>
            Devops
          </button>
        </div>
      </div>
      <div className={styles.techList} id="tech-filtered-list">
        {filteredTechnos.map((icon, index) => (
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
                height: 100%;
              `}>
              <img
                data-atropos-offset="5"
                alt=""
                className={css`
                  object-fit: cover;
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
        ))}
      </div>
    </div>
  )
}

const styles = {
  techName: (theme: string) => css`
    position: absolute;
    background: ${theme === 'black'
      ? darkTheme['base-100']
      : lightTheme['base-200']};
    bottom: 0px;
    border-radius: 5px;
    padding: 0px 2px;
    opacity: 0;
  `,
  techList: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
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
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  `,
}
