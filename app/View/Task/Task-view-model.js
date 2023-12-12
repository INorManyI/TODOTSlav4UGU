import {Frame, Observable} from '@nativescript/core';
import { TaskRepositoryCreate, TaskRepositoryGetCompletedTasks, TaskRepositoryGetUncompletedTasks, } from "~/Model/TaskRepository";
import { CurrentTaskGet, CurrentTaskSet, } from "~/Model/CurrentTask";

const vm = new Observable();

function refreshTasksList()
{
    if (vm.get('isOnCompletedTasks'))
    {
        vm.set('tasks', TaskRepositoryGetCompletedTasks());
        return;
    }
    else
    {
        vm.set('tasks', TaskRepositoryGetUncompletedTasks());
        return;
    }
}

function addNewTask()
{
    TaskRepositoryCreate('Название задачи', '');
    refreshTasksList();
}

function gotoTaskEditor(args)
{
    let taskId = +args.object.items[args.index].Id;
    CurrentTaskSet(taskId);
    if (CurrentTaskGet() !== null)
    {
        Frame.topmost().navigate({
            moduleName: '/View/Task/EditTask/EditTask'
        });
    }
}

function switchToCompletedTasks()
{
    vm.set('isOnCompletedTasks', true);
    refreshTasksList();
}

function switchToUncompletedTasks()
{
    vm.set('isOnCompletedTasks', false);
    refreshTasksList();
}

export function createViewModel()
{
    vm.addNewTask = addNewTask;
    vm.switchToCompletedTasks = switchToCompletedTasks;
    vm.switchToUncompletedTasks = switchToUncompletedTasks;
    vm.gotoTaskEditor = gotoTaskEditor;
    let currentTask = CurrentTaskGet();
    vm.isOnCompletedTasks = (currentTask !== null) && currentTask.IsCompleted;
    refreshTasksList();
    return vm;
}

