import {Dialogs, Frame, Observable} from '@nativescript/core';
import {
    CurrentTaskDelete,
    CurrentTaskGet,
    CurrentTaskSetCompletionStatus,
    CurrentTaskSetDescription,
    CurrentTaskSetTitle,
} from "~/Model/CurrentTask";

const vm = new Observable();

function ShowErrorMessage(message)
{
    Dialogs.alert({
        title: 'Возникла ошибка.',
        message: message,
        okButtonText: 'Хорошо',
    });
}

function refreshTaskInfo()
{
    let task = CurrentTaskGet();
    if (task === null)
    {
        gotoTasksPage();
    }
    vm.set('title', task.Title);
    vm.set('description', task.Description);
    vm.set('isCompleted', task.IsCompleted);
    if (task.IsCompleted)
    {
        vm.set('completionText', "Начать задачу заново");
    }
    else
    {
        vm.set('completionText', "Выполнить задачу");
    }
}

function setTitle(args)
{
    let title = args.object.text;
    if (title.length === 0)
    {
        ShowErrorMessage('Вам нужно ввести название задачи.');
        return;
    }
    vm.set('title', title);
}

function setDescription(args)
{
    let description = args.object.text;
    vm.set('description', description);
}

function reverseCompletionStatus()
{
    vm.set('isCompleted', !vm.get('isCompleted'));
    if (vm.get('isCompleted'))
    {
        vm.set('completionText', "Начать задачу заново");
    }
    else
    {
        vm.set('completionText', "Выполнить задачу");
    }
}

function applyChanges()
{
    let title = vm.get('title');
    if (title.length === 0)
    {
        ShowErrorMessage('Вам нужно ввести название задачи.');
        return;
    }
    let description = vm.get('description');
    let isCompleted = vm.get('isCompleted');
    CurrentTaskSetTitle(title);
    CurrentTaskSetDescription(description);
    CurrentTaskSetCompletionStatus(isCompleted);
    gotoTasksPage();
}

async function removeTask()
{
    let userWantsToDeleteTask = await Dialogs.confirm({
        title: 'Удаление задачи',
        message: 'Вы точно хотите удалить эту задачу?',
        okButtonText: 'Точно',
        cancelButtonText: 'Отмена',
    })
    if (!userWantsToDeleteTask)
        return;
    CurrentTaskDelete();
    gotoTasksPage();
}

function gotoTasksPage()
{
    Frame.topmost().navigate({
        moduleName: '/View/Task/Task',
        clearHistory: true
    });
}

export function createViewModel()
{
    vm.setTitle = setTitle;
    vm.setDescription = setDescription;
    vm.removeTask = removeTask;
    vm.gotoTasksList = gotoTasksPage;
    vm.reverseCompletionStatus = reverseCompletionStatus;
    vm.applyChanges = applyChanges;
    refreshTaskInfo();
    return vm;
}
