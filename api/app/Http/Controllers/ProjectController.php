<?php

namespace App\Http\Controllers;

use App\Data\ApiResponseData;
use App\Data\Project\ProjectData;
use App\Data\Project\ProjectFormData;
use App\Data\Project\ProjectsRequestData;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
    ) {}

    public function index(ProjectsRequestData $projectsRequestData): ApiResponseData
    {
        $projects = $this->projectService->getProjects($projectsRequestData);

        return ApiResponseData::success(
            data: ProjectData::collect($projects)
        );
    }

    public function store(Request $request, ProjectFormData $projectFormData): ApiResponseData
    {
        $project = $this->projectService->createProject(
            user: $request->user(),
            formData: $projectFormData
        );

        return ApiResponseData::success(
            data: ProjectData::from($project),
        );
    }

    public function update(
        Request $request,
        Project $project,
        ProjectFormData $projectFormData
    ): ApiResponseData {
        $project = $this->projectService->updateProject(
            user: $request->user(),
            project: $project,
            formData: $projectFormData,
        );

        return ApiResponseData::success(
            data: ProjectData::from($project),
        );
    }

    public function show(Request $request, Project $project): ApiResponseData
    {
        $project = $this->projectService->getProject(project: $project, user: $request->user());

        return ApiResponseData::success(
            data: ProjectData::from($project),
        );
    }

    public function destroy(Request $request, Project $project): ApiResponseData
    {
        $this->projectService->deleteProject(project: $project, user: $request->user());

        return ApiResponseData::success();
    }
}
