import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './Arrows'
import { DotButton, useDotButton } from './Dots'
import './styles.scss'

type PropType = {
  slides?: number[]
  options?: EmblaOptionsType
}

const defaultSlides = [
  {
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    link: "https://www.porto.com.br/communication-mfe",
    altText: "Comunicação que converte",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    link: "https://www.porto.com.br/communication-mfe",
    altText: "Layouts modernos",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=80",
    link: "https://www.porto.com.br/communication-mfe",
    altText: "Parcels prontos p/ host",
  },
]

export const BannerCarousel = ({ slides, options }: PropType) => {
  const items = slides ?? defaultSlides.map((_, index) => index)
  const [emblaRef, emblaApi] = useEmblaCarousel(options ?? { loop: true })

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const slidesContent = slides
    ? slides.map((index) => ({
        key: String(index),
        node: <span>{index + 1}</span>,
      }))
    : defaultSlides.map((slide) => ({
        key: `${slide.link}-${slide.imageUrl}`,
        node: (
          <a
            href={slide.link}
            target="_blank"
            rel="noreferrer"
            className="embla__slide__link"
          >
            <img
              src={slide.imageUrl}
              alt={slide.altText}
              className="embla__slide__image"
            />
          </a>
        ),
      }))
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slidesContent.map((slide) => (
            <div className="embla__slide" key={slide.key}>
              <div className="embla__slide__number">{slide.node}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />

                  <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={`${items[index] ?? index}`}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>

          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>


      </div>
    </div>
  )
}
