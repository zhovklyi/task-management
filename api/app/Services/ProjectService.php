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

    public function createProject(ProjectFormData $projectFormData): Project
    {
        return $this->projectRepository->create($projectFormData);
    }

    public function updateProject(Project $project, ProjectFormData $projectFormData): Project
    {
        $this->checkProjectOwnership($project, $projectFormData->user);

        return $this->projectRepository->update($project, $projectFormData);
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
