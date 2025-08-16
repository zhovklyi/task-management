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

    public function store(ProjectFormData $projectFormData): ApiResponseData
    {
        $project = $this->projectService->createProject($projectFormData);

        return ApiResponseData::success(
            data: ProjectData::from($project),
        );
    }

    public function update(ProjectFormData $projectFormData, Project $project): ApiResponseData
    {
        $project = $this->projectService->updateProject($project, $projectFormData);

        return ApiResponseData::success(
            data: ProjectData::from($project),
        );
    }

    public function show(Request $request, Project $project): ApiResponseData
    {
        $project = $this->projectService->getProject($project, $request->user());

        return ApiResponseData::success(
            data: ProjectData::from($project),
        );
    }

    public function destroy(Request $request, Project $project): ApiResponseData
    {
        $this->projectService->deleteProject($project, $request->user());

        return ApiResponseData::success();
    }
}
