"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Tag,
  ArrowUp,
  ArrowDown,
  EyeOff,
  Download,
  Search,
  View
} from "lucide-react"

// Mock data
const initialTasks = [
  {
    id: "TASK-3773",
    type: "bug",
    title: "We need to bypass the wireless XML program!",
    status: "Todo",
    priority: "Medium",
    archived: "No",
    createdAt: "November 9, 2024",
  },
  {
    id: "TASK-1969",
    type: "enhancement",
    title: "Synthesizing the panel won't do anything, we need to program the back-end SQL protocol!",
    status: "Done",
    priority: "High",
    archived: "No",
    createdAt: "November 9, 2024",
  },
]

const ITEMS_PER_PAGE = 10
const TOTAL_PAGES = 16

type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  column: string;
  direction: SortDirection;
};

type ColumnVisibility = {
  [key: string]: boolean;
};

export default function DataTableCrud() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(3)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [editingTask, setEditingTask] = useState<typeof tasks[0] | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<typeof tasks[0] | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: '', direction: null })
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    id: true,
    title: true,
    status: true,
    priority: true,
    archived: true,
    createdAt: true,
  })
  const [searchQuery, setSearchQuery] = useState('')

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-500 dark:text-red-400"
      case "medium":
        return "text-yellow-500 dark:text-yellow-400"
      case "low":
        return "text-green-500 dark:text-green-400"
      default:
        return ""
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "todo":
        return "secondary"
      case "in-progress":
        return "default"
      case "done":
        return "success"
      case "canceled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.length === tasks.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(tasks.map(task => task.id))
    }
  }

  const handleSelectRow = (taskId: string) => {
    setSelectedRows(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleEditTask = (task: typeof tasks[0]) => {
    setEditingTask(task)
    setIsEditSheetOpen(true)
  }

  const handleDeleteTask = (task: typeof tasks[0]) => {
    setTaskToDelete(task)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id))
      setIsDeleteDialogOpen(false)
      setTaskToDelete(null)
    }
  }

  const handleSort = (column: string) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.column === column && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ column, direction });

    if (direction) {
      setTasks([...tasks].sort((a, b) => {
        if (a[column as keyof typeof a] < b[column as keyof typeof b]) return direction === 'asc' ? -1 : 1;
        if (a[column as keyof typeof a] > b[column as keyof typeof b]) return direction === 'asc' ? 1 : -1;
        return 0;
      }));
    } else {
      setTasks(initialTasks);
    }
  };

  const toggleColumnVisibility = (column: string) => {
    setColumnVisibility(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const visibleColumns = Object.entries(columnVisibility)
    .filter(([_, isVisible]) => isVisible)
    .map(([column]) => column);

  const handleExportCSV = () => {
    const headers = visibleColumns.join(',')
    const csvData = tasks.map(task => 
      visibleColumns.map(col => task[col as keyof typeof task]).join(',')
    ).join('\n')
    
    const blob = new Blob([`${headers}\n${csvData}`], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tasks.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredTasks = tasks.filter(task =>
    Object.values(task).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="w-full">
      <div className="overflow-auto py-1 px-1 -mx-1 -my-1">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 px-1 py-1">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ..."
                className="pl-10 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 px-1 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <View className="mr-2 h-4 w-4" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <div className="p-2">
                  <div className="text-sm font-medium mb-2">Toggle columns</div>
                  <div className="grid gap-2">
                    {Object.entries(columnVisibility).map(([column, isVisible]) => (
                      <Label key={column} className="flex items-center gap-2">
                        <Checkbox 
                          checked={isVisible} 
                          onCheckedChange={() => toggleColumnVisibility(column)}
                        />
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </Label>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-9" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === tasks.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {visibleColumns.includes('id') && <TableHead className="w-[100px]">Task</TableHead>}
                {visibleColumns.includes('title') && (
                  <TableHead className="min-w-[200px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                          <span>Title</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('title')}>
                          <ArrowUp className="mr-2 h-4 w-4" />
                          Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('title')}>
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleColumnVisibility('title')}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                {visibleColumns.includes('status') && (
                  <TableHead className="w-[100px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                          <span>Status</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('status')}>
                          <ArrowUp className="mr-2 h-4 w-4" />
                          Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('status')}>
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleColumnVisibility('status')}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                {visibleColumns.includes('priority') && (
                  <TableHead className="w-[100px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                          <span>Priority</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('priority')}>
                          <ArrowUp className="mr-2 h-4 w-4" />
                          Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('priority')}>
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleColumnVisibility('priority')}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                {visibleColumns.includes('archived') && (
                  <TableHead className="w-[100px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                          <span>Archived</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('archived')}>
                          <ArrowUp className="mr-2 h-4 w-4" />
                          Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('archived')}>
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleColumnVisibility('archived')}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                {visibleColumns.includes('createdAt') && (
                  <TableHead className="w-[150px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                          <span>Created At</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('createdAt')}>
                          <ArrowUp className="mr-2 h-4 w-4" />
                          Asc
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('createdAt')}>
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Desc
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleColumnVisibility('createdAt')}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(task.id)}
                      onCheckedChange={() => handleSelectRow(task.id)}
                    />
                  </TableCell>
                  {visibleColumns.includes('id') && <TableCell className="font-medium">{task.id}</TableCell>}
                  {visibleColumns.includes('title') && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {task.type}
                        </Badge>
                        <span className="truncate max-w-[300px] sm:max-w-[400px] md:max-w-none">{task.title}</span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes('status') && (
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(task.status)}>
                        {task.status}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.includes('priority') && (
                    <TableCell>
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </span>
                    </TableCell>
                  )}
                  {visibleColumns.includes('archived') && <TableCell>{task.archived}</TableCell>}
                  {visibleColumns.includes('createdAt') && <TableCell>{task.createdAt}</TableCell>}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => handleEditTask(task)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Tag className="mr-2 h-4 w-4" />
                            Labels
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Bug</DropdownMenuItem>
                            <DropdownMenuItem>Feature</DropdownMenuItem>
                            <DropdownMenuItem>Enhancement</DropdownMenuItem>
                            <DropdownMenuItem>Documentation</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteTask(task)}
                        >
                          Delete
                          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 sm:mb-0">
            <span>{selectedRows.length} of {tasks.length} row(s) selected.</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Rows per page</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(parseInt(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue>{itemsPerPage}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium whitespace-nowrap">
                Page {currentPage} of {TOTAL_PAGES}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronFirst className="h-4 w-4" />
                  <span className="sr-only">First page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(prev => Math.min(TOTAL_PAGES, prev + 1))}
                  disabled={currentPage === TOTAL_PAGES}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(TOTAL_PAGES)}
                  disabled={currentPage === TOTAL_PAGES}
                >
                  <ChevronLast className="h-4 w-4" />
                  <span className="sr-only">Last page</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent className="sm:max-w-[400px]">
            <SheetHeader>
              <SheetTitle>Edit Task</SheetTitle>
              <SheetDescription>
                Make changes to the task here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingTask?.title}
                  onChange={(e) => setEditingTask(prev => prev ? {...prev, title: e.target.value} : prev)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingTask?.status}
                  onValueChange={(value) => setEditingTask(prev => prev ? {...prev, status: value} : prev)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In-Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={editingTask?.priority}
                  onValueChange={(value) => setEditingTask(prev => prev ? {...prev, priority: value} : prev)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Handle save logic here
                  setIsEditSheetOpen(false)
                }}>
                  Save changes
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the task
                "{taskToDelete?.title}" and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteTask}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}