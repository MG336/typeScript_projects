import {ProjectManager, Admin, Task, Project, User} from '../../src/projects/middle/project_management';
import { describe, it, expect,vi,beforeEach } from 'vitest';


describe('ProjectManager',()=>{
    let projectManagement: ProjectManager;

    beforeEach(()=> {
        projectManagement = new ProjectManager;
    })
    const user1 = new User('user1', '1');
    const task1 = new Task('task1', 'description1', 'pending', user1, Date.now() + 3600 * 24);
    const task2 = new Task('task1', 'description1', 'pending', user1, Date.now() + 3600 * 48);

    const project1 = new Project('test1', 'description', '1');

    describe('createProject', ()=> {
        it('should create an object and add it to projects', ()=>{
           const testProject1 = projectManagement.createProject('test1', 'description', '1');
           expect(testProject1).toEqual(project1);
           expect(projectManagement.projects.length).toBe(1);
        });
    });


    describe('addUserToProject',()=> {
        it('should add User to the project',()=>{
            projectManagement.createProject('test1', 'description', '1');
            projectManagement.addUserToProject('1', user1);
            expect(projectManagement.projects[0].users.length).toBe(1);
        })
        it('should throw an error if the project does not exist',()=>{
            expect(()=>projectManagement.addUserToProject('1', user1)).toThrow('project not found');
        })
    })

    describe('removeUserFromProject',()=>{
        it('should remove user',()=>{
            projectManagement.createProject('test1', 'description', '1');
            projectManagement.addUserToProject('1', user1);
            projectManagement.removeUserFromProject('1', '1');
            expect(projectManagement.projects[0].users.length).toBe(0);
        })
        it('should throw an error if User is not found',()=>{
            projectManagement.createProject('test1', 'description', '1');
            expect(()=>projectManagement.removeUserFromProject('1', '1')).toThrow('user not found');
        })
    })
    

    describe('addTaskProject',()=>{
        it('should add task to the project',()=>{
            projectManagement.createProject('test1', 'description', '1');
           
            projectManagement.addTaskProject('1',task1);
            expect(projectManagement.projects[0].tasks.length).toBe(1);
        })
        it('should throw an error if the project does not exist',()=>{
            const user = new User('user1','1');
            expect(()=>projectManagement.addTaskProject('1', task1)).toThrow('project not found');
        })
    })

    describe('updateTaskStatus', ()=>{
        it('should update task',()=>{
            projectManagement.createProject('test1', 'description', '1');
            projectManagement.addTaskProject('1',task1);
            projectManagement.updateTaskStatus('1','task1','in-progress');
            
            expect(projectManagement.projects[0].tasks[0].status).toBe('in-progress');
        })
        it('should throw an error if the task is not found',()=>{
            projectManagement.createProject('test1', 'description', '1');
            expect(()=> projectManagement.updateTaskStatus('1','task1','in-progress')).toThrow('task not found');
        })
    })

    describe('listTasks',()=>{
        it('should return an array of tasks', ()=>{
            projectManagement.createProject('test1', 'description', '1');
            projectManagement.addTaskProject('1',task1);
            projectManagement.addTaskProject('1',task2);

            const listTasks = projectManagement.listTasks('1');
            
            expect(listTasks.length).toBe(2);
            expect(listTasks).toEqual(expect.arrayContaining([task1,task2]));
        })
    })
})
