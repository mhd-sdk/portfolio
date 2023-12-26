import { css, cx } from '@emotion/css'
import { technos } from '@ui/DevIcons/technos'
import Atropos from 'atropos/react'
import 'atropos/css'
import { useState } from 'react'
export const TechSearch = (): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const handleChangeFilters = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    }
    setSelectedFilters([...selectedFilters, filter])
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div role="tablist" className={cx('tabs tabs-boxed', styles.filter)}>
          <button
            onClick={() => {
              handleChangeFilters('language')
            }}
            role="tab"
            className="tab btn-active"
          >
            Langages
          </button>
          <button role="tab" className="tab">
            Libraries
          </button>
          <button role="tab" className="tab">
            Frameworks
          </button>
          <button role="tab" className="tab">
            Devops
          </button>
        </div>
        <div role="tablist" className={cx('tabs tabs-boxed', styles.filter)}>
          <button role="tab" className="tab btn-active">
            Frontend
          </button>
          <button role="tab" className="tab">
            Backend
          </button>
        </div>
      </div>
      <div className={styles.techList} id="tech-filtered-list">
        {technos.map((icon, index) => (
          <Atropos
            key={index}
            className={styles.atroposCard}
            shadow={false}
            highlight={false}
          >
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
              `}
            >
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
            </div>
          </Atropos>
        ))}
      </div>
    </div>
  )
}

const styles = {
  techList: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `,
  atroposCard: css`
    width: 100px;
    height: 100px;
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
  `
}
