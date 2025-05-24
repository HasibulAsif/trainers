"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, File, X, Check, Loader2 } from "lucide-react"

interface FileUploadProps {
  onUpload?: (file: File) => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({ onUpload, accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png", maxSize = 5 }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setIsSuccess(false)

    if (!selectedFile) {
      setFile(null)
      return
    }

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      setFile(null)
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (onUpload) {
        onUpload(file)
      }

      setIsSuccess(true)
      setTimeout(() => {
        setFile(null)
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      setError("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800">
              <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-medium">Upload a file</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports {accept.split(",").join(", ")} (Max {maxSize}MB)
              </p>
            </div>

            <div className="w-full">
              <Label htmlFor="file-upload" className="sr-only">
                Choose a file
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center">
          <X className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      {file && !error && (
        <div className="mt-4">
          <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center">
              <File className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div className="text-sm truncate max-w-[200px]">{file.name}</div>
            </div>

            {isSuccess ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <Check className="h-4 w-4 mr-1" />
                <span className="text-xs">Uploaded</span>
              </div>
            ) : (
              <Button size="sm" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
