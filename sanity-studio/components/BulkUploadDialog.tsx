import React, { useState } from 'react'
import { Card, Flex, Box, Text, Button, Select, Stack, Spinner } from '@sanity/ui'
import { UploadIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import { bulkUploadImages } from '../lib/bulkUploadHandler'

interface BulkUploadDialogProps {
  documentType: 'galleryImage' | 'eventTypeImage' | 'featureImage'
  categoryField: string
  categoryOptions: Array<{ title: string; value: string }>
  onClose: () => void
}

export function BulkUploadDialog({
  documentType,
  categoryField,
  categoryOptions,
  onClose,
}: BulkUploadDialogProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (!selectedCategory || files.length === 0) return

    setUploading(true)
    setProgress(`Uploading 0 of ${files.length}...`)

    try {
      const result = await bulkUploadImages({
        client,
        files,
        documentType,
        categoryField,
        categoryValue: selectedCategory,
        onProgress: (current, total) => {
          setProgress(`Uploading ${current} of ${total}...`)
        },
      })

      if (result.errors.length > 0) {
        setProgress(
          `Upload complete! ${result.success} succeeded, ${result.errors.length} failed.`
        )
        console.error('Upload errors:', result.errors)
      } else {
        setProgress(`Upload complete! ${result.success} images uploaded successfully.`)
      }

      // Close dialog after a brief delay to show success message
      setTimeout(() => {
        onClose()
        // Note: Sanity Studio will automatically refresh the document list
      }, 1500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setProgress(`Error: ${errorMessage}`)
      setUploading(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={2} weight="semibold">
          Bulk Upload Images
        </Text>

        <Box>
          <Text size={1} muted style={{ marginBottom: '8px' }}>
            Step 1: Select Category
          </Text>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.currentTarget.value)}
            disabled={uploading}
          >
            <option value="">Choose category...</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.title}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Text size={1} muted style={{ marginBottom: '8px' }}>
            Step 2: Choose Images
          </Text>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={!selectedCategory || uploading}
            style={{ marginTop: '8px' }}
          />
          {files.length > 0 && (
            <Text size={1} muted style={{ marginTop: '8px' }}>
              {files.length} file(s) selected
            </Text>
          )}
        </Box>

        {progress && (
          <Card padding={3} tone="primary">
            <Text size={1}>{progress}</Text>
          </Card>
        )}

        <Flex gap={2}>
          <Button
            text="Upload"
            tone="primary"
            icon={uploading ? Spinner : UploadIcon}
            onClick={handleUpload}
            disabled={!selectedCategory || files.length === 0 || uploading}
          />
          <Button
            text="Cancel"
            mode="ghost"
            onClick={onClose}
            disabled={uploading}
          />
        </Flex>

        <Box paddingTop={2}>
          <Text size={1} muted>
            Note: Alt text will be auto-generated from filenames. Display order
            will auto-increment by 10 (10, 20, 30...). You can edit these after
            upload if needed.
          </Text>
        </Box>
      </Stack>
    </Card>
  )
}
