import React from 'react'

export const ButtonHeaderLarge = ({ buttonText, url } : { buttonText: string; url: string }) => {
  return (
    <a href={url} className="flex justify-center items-center text-center w-full rounded-md text-white text-xl py-2 hover:scale-103 bg-[var(--secondary)] hover:bg-[var(--primary-dark)] transition-all duration-500">
      {buttonText}
    </a>

  )
}
