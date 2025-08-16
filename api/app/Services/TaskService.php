<?php

namespace App\Services;

use App\Data\Task\TaskFormData;
use App\Data\Task\TasksRequestData;
use App\Models\Task;
use App\Models\User;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    public function __construct(
        private ProjectRepository $projectRepository,
        private TaskRepository $taskRepository,
    ) {}

    public function getTasks(TasksRequestData $requestData): Collection
    {
        return $this->taskRepository->getTasksByUser($requestData->user);
    }

    public function createTask(User $user, TaskFormData $formData): Task
    {
        $project = $this->projectRepository->findOrFail($formData->project_id);

        if ($project->user_id !== $user->id) {
            throw new AuthorizationException;
        }

        return $this->taskRepository->create($formData);
    }

    public function updateTask(Task $task, TaskFormData $formData, User $user): Task
    {
        $this->checkTaskOwnership($task, $user);

        return $this->taskRepository->update($task, $formData);
    }

    public function getTask(Task $task, User $user): Task
    {
        $this->checkTaskOwnership($task, $user);

        return $task;
    }

    public function deleteTask(Task $task, User $user): bool
    {
        $this->checkTaskOwnership($task, $user);

        return $this->taskRepository->delete($task);
    }

    /**
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    private function checkTaskOwnership(Task $task, User $user): void
    {
        if ($task->project->user_id !== $user->id) {
            throw new AuthorizationException;
        }
    }
}
