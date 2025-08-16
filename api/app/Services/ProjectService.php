<?php

namespace App\Services;

use App\Data\Project\ProjectFormData;
use App\Data\Project\ProjectsRequestData;
use App\Models\Project;
use App\Models\User;
use App\Repositories\ProjectRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository,
    ) {}

    public function getProjects(ProjectsRequestData $requestData): Collection
    {
        return $this->projectRepository->getProjectsByUser($requestData->user);
    }

    public function createProject(User $user, ProjectFormData $formData): Project
    {
        return $this->projectRepository->create($user, $formData);
    }

    public function updateProject(
        User $user,
        Project $project,
        ProjectFormData $formData
    ): Project {
        $this->checkProjectOwnership($project, $user);

        return $this->projectRepository->update($project, $formData);
    }

    public function deleteProject(Project $project, User $user): bool
    {
        $this->checkProjectOwnership($project, $user);

        return $this->projectRepository->delete($project);
    }

    public function getProject(Project $project, User $user): Project
    {
        $this->checkProjectOwnership($project, $user);

        return $project;
    }

    /**
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    private function checkProjectOwnership(Project $project, User $user): void
    {
        if ($project->user_id !== $user->id) {
            throw new AuthorizationException;
        }
    }
}
