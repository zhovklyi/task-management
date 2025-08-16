<?php

namespace App\Http\Controllers;

use App\Data\ApiResponseData;
use App\Data\Task\TaskData;
use App\Data\Task\TaskFormData;
use App\Data\Task\TasksRequestData;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService,
    ) {}

    public function index(TasksRequestData $tasksRequestData): ApiResponseData
    {
        $tasks = $this->taskService->getTasks($tasksRequestData);

        return ApiResponseData::success(
            data: TaskData::collect($tasks),
        );
    }

    public function store(Request $request, TaskFormData $taskFormData): ApiResponseData
    {
        $task = $this->taskService->createTask($taskFormData, $request->user());

        return ApiResponseData::success(
            data: TaskData::from($task),
        );
    }

    public function update(Request $request, TaskFormData $taskFormData, Task $task): ApiResponseData
    {
        $task = $this->taskService->updateTask($task, $taskFormData, $request->user());

        return ApiResponseData::success(
            data: TaskData::from($task),
        );
    }

    public function show(Request $request, Task $task): ApiResponseData
    {
        $task = $this->taskService->getTask($task, $request->user());

        return ApiResponseData::success(
            data: TaskData::from($task),
        );
    }

    public function destroy(Request $request, Task $task): ApiResponseData
    {
        $this->taskService->deleteTask($task, $request->user());

        return ApiResponseData::success();
    }
}
