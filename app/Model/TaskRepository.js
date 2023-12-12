import {DatabaseGet} from "~/Model/database";

export class Task
{
    Id;
    Title;
    Description;
    IsCompleted;
    constructor(Id, Title, Description, IsCompleted)
    {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.IsCompleted = IsCompleted !== 0;
    }
}

export function TaskRepositoryCreate(taskTitle, taskDescription)
{
    let database = DatabaseGet();
    database.execSQL(`INSERT INTO Task (title, description) VALUES ('${taskTitle}', '${taskDescription}')`);
}

export function TaskRepositoryGetCompletedTasks()
{
    let tasks = [];
    let database = DatabaseGet();
    database.all('SELECT * FROM Task WHERE is_completed = 1', (err, cols) =>
    {
        for (let col of cols)
        {
            tasks.push(new Task(col[0], col[1], col[2], col[3]));
        }
    });
    return tasks;
}

export function TaskRepositoryGetUncompletedTasks()
{
    let database = DatabaseGet();
    let tasks = [];
    database.all('SELECT * FROM Task WHERE is_completed = 0', (err, cols) => {
        for (let col of cols)
        {
            tasks.push(new Task(col[0], col[1], col[2], col[3]));
        }
    });
    return tasks;
}

export function TaskRepositoryGet(taskId)
{
    let database = DatabaseGet();
    let task = null;
    database.get(`SELECT * FROM Task WHERE id = ${taskId} LIMIT 1`, (err, cols) =>
    {
        if (cols.length === 0)
        {
            return;
        }
        task = new Task(cols[0], cols[1], cols[2], cols[3]);
    });
    return task;
}

export function TaskRepositoryDelete(taskId)
{
    let database = DatabaseGet();
    database.execSQL(`DELETE FROM Task WHERE id = ${taskId}`);
}

export function TaskRepositoryChangeTitle(taskId, newTitle)
{
    let database = DatabaseGet();
    database.execSQL(`UPDATE Task SET title = '${newTitle}' WHERE id = ${taskId}`);
}

export function TaskRepositoryChangeDescription(taskId, newDescription)
{
    let database = DatabaseGet();
    database.execSQL(`UPDATE Task SET description = '${newDescription}' WHERE id = ${taskId}`);
}

export function TaskRepositorySetCompletionStatus(taskId, isCompleted)
{
    let isCompletedNum = isCompleted? 1: 0;
    let database = DatabaseGet();
    database.execSQL(`UPDATE Task SET is_completed = "${isCompletedNum}" WHERE id = ${taskId}`);
}
