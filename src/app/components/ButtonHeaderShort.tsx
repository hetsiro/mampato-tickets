import React from 'react'

export const ButtonHeaderShort = ({ buttonText, url } : { buttonText: string; url: string }) => {
  return (
    <a href={url} className="flex w-full h-12 justify-center items-center text-center rounded-md text-white text-sm tracking-wide px-2 py-1 hover:scale-105 bg-[var(--primary-dark)] hover:bg-[var(--secondary)] transition-all duration-500">
      {buttonText}
    </a>

  )
}
