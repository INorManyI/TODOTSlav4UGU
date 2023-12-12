import { TaskRepositoryChangeDescription, TaskRepositoryChangeTitle, TaskRepositoryDelete, TaskRepositoryGet, TaskRepositorySetCompletionStatus} from "~/Model/TaskRepository";

let currentTask = null;

export function CurrentTaskGet()
{
    return currentTask;
}

export function CurrentTaskSet(id)
{
    currentTask = TaskRepositoryGet(id);
}

export function CurrentTaskSetTitle(newTitle)
{
    if (currentTask === null)
    {
        return;
    }
    if (newTitle.length === 0)
    {
        return;
    }
    TaskRepositoryChangeTitle(currentTask.Id, newTitle);
    currentTask.Title = newTitle;
}

export function CurrentTaskSetDescription(newDescription)
{
    TaskRepositoryChangeDescription(currentTask.Id, newDescription);
    currentTask.Description = newDescription;
}

export function CurrentTaskSetCompletionStatus(isCompleted)
{
    if (currentTask === null)
    {
        return;
    }
    TaskRepositorySetCompletionStatus(currentTask.Id, isCompleted);
    currentTask.IsCompleted = isCompleted;
}

export function CurrentTaskDelete()
{
    if (currentTask === null)
    {
        return;
    }
    TaskRepositoryDelete(currentTask.Id);
    currentTask = null;
}
