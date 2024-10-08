// Task: Project Management System
// Description:
// Develop a system for managing projects that includes classes for tasks (Tasks), users (Users), and projects (Projects).
// The system should allow the addition of users, the creation of projects, and the management of tasks within these projects.
// Implement validations for input data, such as ensuring that tasks do not overlap in terms of deadlines.
// Apply inheritance where appropriate, for example, for different types of users (administrators, regular users).
// Use TypeScript for data typing and type safety.



class Task {
    constructor(
        public title: string,
        public description: string,
        public status: 'pending' | 'in-progress' | 'completed',
        public assignedTo: User | null,
        public dueDate: number,
    ) { }
}

class User {
    constructor(
        public name: string,
        public userId: string
    ) { }
    displayInfo(): void {
        console.log(`username: ${this.name}, userId:${this.userId}`);
    }
}

class Admin extends User {
    constructor(
        username: string,
        userId: string,
        public adminLevel: number,
        public projectManager: ProjectManager
    ) {
        super(username, userId);
    }

    displayInfo(): void {
        super.displayInfo();
        console.log(`admin Level:${this.adminLevel}`);
    }

    addUserToProject(projectId: string, user: User): void {
        this.projectManager.addUserToProject(projectId, user);
    }

    removeUserFromProject(projectId: string, userId: string): void {
        this.projectManager.removeUserFromProject(projectId, userId);
    }

}



class Project {
    public tasks: Task[] = [];
    public users: User[] = [];
    public admin: Admin[] = [];
    constructor(
        private name: string,
        private description: string,
        public projectId: string

    ) { }
}

class ProjectManager {
    constructor(
    ) { }

    public projects: Project[] = [];

    createProject(name: string, description: string, projectId: string): Project {
        const newProject = new Project(name, description, projectId);
        this.projects.push(newProject);
        return newProject
    }

    addUserToProject(projectId: string, user: User): void {
        const project = this.getProjectById(projectId);

        project?.users.push(user);
    }

    removeUserFromProject(projectId: string, userId: string): void {
        const project = this.getProjectById(projectId);

        const userIndex = project?.users.findIndex(item => item.userId === userId);
        if (userIndex === -1) {
            throw new Error('user not found');
        }
        project?.users.splice(userIndex, 1);
    }


    addTaskProject(projectId: string, task: Task): void {
        const project = this.getProjectById(projectId);

        //check data
        if (project.tasks.find((item) => item.dueDate > task.dueDate)) {
            throw new Error('tasks overlap in deadlines');
        }

        project.tasks.push(task);
    }

    updateTaskStatus(projectId: string, taskTitle: string, newStatus: 'pending' | 'in-progress' | 'completed'): boolean {
        const project = this.getProjectById(projectId);

        const task = this.getTaskById(project, taskTitle);

        task.status = newStatus;
        return true
    }

    listTasks(projectId: string): Task[] {
        const project = this.getProjectById(projectId);
        return project.tasks
    }

    private getProjectById(projectId: string): Project {
        const project = this.projects.find((item) => item.projectId === projectId);
        if (!project) {
            throw new Error('project not found');
        }
        return project
    }

    private getTaskById(project: Project, taskId: string): Task {
        const task = project.tasks.find((item) => item.title === taskId);
        if (!task) {
            throw new Error('task not found');
        }
        return task
    }
}


const projectManager = new ProjectManager();
const project1 = projectManager.createProject('project1', 'descripton1', '1');

const user1 = new User('user1', '1');
const user2 = new User('user2', '2');
const user3 = new User('user3', '3');

const admin1 = new Admin('admin1', '101', 1, projectManager);

const task1 = new Task('task1', 'description1', 'pending', user1, Date.now() + 3600 * 24)
const task2 = new Task('task2', 'description1', 'pending', user2, Date.now() + 3600 * 48)

projectManager.addUserToProject('1', user1);
projectManager.addUserToProject('1', user2);
projectManager.addTaskProject('1', task1);
projectManager.addTaskProject('1', task2);
projectManager.updateTaskStatus('1', 'task1', 'completed');

console.log(projectManager.listTasks('1'));

admin1.displayInfo();

admin1.addUserToProject('1', user3);
admin1.removeUserFromProject('1', '2');

console.log(project1)


export { ProjectManager, Admin, Task, Project, User }