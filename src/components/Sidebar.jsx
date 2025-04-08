import SidebarButton from './SidebarButton';

const Sidebar = () => {
  return (
    <div className="h-screen w-[272px] bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00AD85]">Task Manager</h1>
        <p>
          Um simples{' '}
          <span className="text-[#00AD85]">organizador de tarefas</span>.
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant={'default'}>Início</SidebarButton>
        <SidebarButton variant={'selected'}>Minhas Tarefas</SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
