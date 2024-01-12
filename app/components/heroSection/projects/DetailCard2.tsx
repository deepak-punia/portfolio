const DetailCard2 = ({ project }) => {
  return (
    <div className="bg-white flex flex-col items-start w-[672px] text-3xl md:text-base">
      <div className="flex gap-2 items-start justify-center mb-3 pt-2 flex-col md:flex-row">
        <span className="font-semibold text-gray-700 min-w-28">Description: </span>
        <span className="text-gray-500">{project.description}</span>
      </div>

      <div className="flex gap-2 items-start justify-center mb-3 pt-2 flex-col md:flex-row">
        <span className="font-semibold text-gray-700 min-w-28">Technologies: </span>
        <span className="text-gray-500">
          {project.technologies.map((tech, index) => {
            if (project.technologies.length === index + 1) return <>{tech}.</>;
            return <>{tech}, </>;
          })}
        </span>
      </div>

      <div className="flex gap-2 items-start justify-center mb-3 pt-2 flex-col md:flex-row">
        <span className="font-semibold text-gray-700 min-w-28">Features: </span>
        <span className="text-gray-500">
          {project.features.map((feature, index) => {
            if (project.features.length === index + 1) return <>{feature}.</>;
            return <>{feature}, </>;
          })}
        </span>
      </div>
      <div>
        <a
          href={project.link}
          target="_blank"
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Visit Project
        </a>

        <a
          href={project.sourceCode}
          target="_blank"
          className="ml-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Source Code
        </a>
      </div>
    </div>
  );
};

export default DetailCard2;
