"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import { ChevronLeft, FileText, Download, Trash2, File, ImageIcon, FileSpreadsheet, Calendar } from "lucide-react"

export default function OrderFilesPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [activeTab, setActiveTab] = useState("all")

  // Mock files data
  const [files, setFiles] = useState([
    {
      id: "file-1",
      name: "workout-plan-week-1.pdf",
      type: "pdf",
      size: "2.4 MB",
      category: "workout",
      uploadedAt: "2023-11-18T14:30:00Z",
    },
    {
      id: "file-2",
      name: "nutrition-guidelines.docx",
      type: "doc",
      size: "1.8 MB",
      category: "nutrition",
      uploadedAt: "2023-11-17T10:15:00Z",
    },
    {
      id: "file-3",
      name: "progress-photo-week-1.jpg",
      type: "image",
      size: "3.2 MB",
      category: "progress",
      uploadedAt: "2023-11-16T09:45:00Z",
    },
    {
      id: "file-4",
      name: "meal-plan-template.xlsx",
      type: "spreadsheet",
      size: "1.5 MB",
      category: "meal",
      uploadedAt: "2023-11-15T16:20:00Z",
    },
  ])

  const handleUpload = (file: File) => {
    // In a real app, you would upload the file to your storage
    // and then add the file metadata to your database

    const fileType = file.name.split(".").pop()?.toLowerCase() || ""
    let category = "other"
    let type = "file"

    if (fileType === "pdf" || fileType === "doc" || fileType === "docx") {
      type = "doc"
      if (file.name.includes("workout")) {
        category = "workout"
      } else if (file.name.includes("nutrition")) {
        category = "nutrition"
      } else if (file.name.includes("meal")) {
        category = "meal"
      }
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      type = "image"
      if (file.name.includes("progress")) {
        category = "progress"
      }
    } else if (["xlsx", "csv"].includes(fileType)) {
      type = "spreadsheet"
    }

    const newFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      type,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      category,
      uploadedAt: new Date().toISOString(),
    }

    setFiles([newFile, ...files])
  }

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "doc":
        return <FileText className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredFiles = activeTab === "all" ? files : files.filter((file) => file.category === activeTab)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href={`/trainer/orders/${id}`}>
          <Button variant="ghost" size="sm" className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Order
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Order Files</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>Manage files shared with your client for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="workout">Workout</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="meal">Meal</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                  {filteredFiles.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">No files found</p>
                    </div>
                  ) : (
                    filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex items-center">
                          {getFileIcon(file.type)}
                          <div className="ml-3">
                            <p className="font-medium">{file.name}</p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span>{file.size}</span>
                              <span className="mx-2">•</span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(file.uploadedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>Share files with your client</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload onUpload={handleUpload} />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>File Categories</CardTitle>
              <CardDescription>Organize files by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <span>Workout Plans</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {files.filter((f) => f.category === "workout").length} files
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Nutrition Plans</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {files.filter((f) => f.category === "nutrition").length} files
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span>Meal Plans</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {files.filter((f) => f.category === "meal").length} files
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span>Progress Photos</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {files.filter((f) => f.category === "progress").length} files
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
