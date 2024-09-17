import icon from '../assets/chimney_temp_icon.png'
import { open } from '@tauri-apps/plugin-dialog'
import { readFile } from '@tauri-apps/plugin-fs'
import { ControlRenderCallback } from 'flume'
import { useEffect, useState } from 'react'
import { getImageSize } from 'react-image-size'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 8px 16px;
  margin-top: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }
`

const Container = styled.div`
  width: 100%;
`

const StyledImagePixelated = styled.img`
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`

export const renderFilepathFlume: ControlRenderCallback = (value, onChange) => {
  const [img, setImage] = useState<string | ArrayBuffer | null>(icon)
  const [useLinearScaling, setUseLinearScaling] = useState(false)

  useEffect(() => {
    const loadImage = async () => {
      if (!value) return

      try {
        const fileContent = await readFile(value)
        const blob = new Blob([fileContent], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        setImage(imageUrl)

        // Use react-image-size to get the image dimensions
        const { width } = await getImageSize(imageUrl)
        setUseLinearScaling(width < 100)
      } catch (error) {
        console.error('Error reading file or getting image size:', error)
      }
    }

    loadImage()
  }, [value])

  return (
    <Container>
      {useLinearScaling ? (
        <>
          <StyledImagePixelated src={img as string} alt="Icon" />
        </>
      ) : (
        <StyledImage src={img as string} alt="Icon" />
      )}

      <StyledButton
        onClick={async () => {
          const ret = await open({
            filters: [
              {
                name: 'PNG',
                extensions: ['png'],
              },
            ],
          })

          if (ret) {
            onChange(ret)
          }
        }}
      >
        Load image
      </StyledButton>
    </Container>
  )
}
