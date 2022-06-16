CREATE TABLE tb_node (  
    id CHAR(20) NOT NULL PRIMARY KEY COMMENT '节点唯一ID',
    node_ip CHAR(20) NOT NULL COMMENT '节点IP地址',
    node_registed_at TIMESTAMP NOT NULL COMMENT '节点注册时间',
    node_status CHAR(15) NOT NULL COMMENT '节点状态',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX unique_node_ip (node_ip),
    UNIQUE INDEX unique_id (id)
) DEFAULT CHARSET UTF8MB4 COMMENT '节点表';

CREATE TABLE tb_task (  
    id CHAR(20) NOT NULL PRIMARY KEY COMMENT '任务唯一ID',
    task_file VARCHAR(255) NOT NULL COMMENT '任务原文件路径',
    task_metadata TEXT COMMENT '任务原文件元数据',
    task_status CHAR(15) NOT NULL COMMENT '任务状态',
    task_callback VARCHAR(255) NOT NULL COMMENT '任务回调通知地址',
    task_output VARCHAR(255) NOT NULL COMMENT '任务输出文件路径',
    task_hash VARCHAR(255) NOT NULL COMMENT '任务元文件HASH',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX unique_id (id)
) DEFAULT CHARSET UTF8MB4 COMMENT '节点表';

CREATE TABLE tb_job (  
    id CHAR(20) NOT NULL PRIMARY KEY COMMENT '作业唯一ID',
    job_task_id CHAR(20) NOT NULL COMMENT '作业所属任务唯一ID',
    job_node_id CHAR(20) COMMENT '作业运行节点唯一ID',
    job_status CHAR(15) NOT NULL COMMENT '作业状态',
    job_retried INT(5) NOT NULL DEFAULT 0 COMMENT '作业重试次数',
    job_file VARCHAR(255) NOT NULL COMMENT '作业输入文件路径',
    job_args VARCHAR(255) NOT NULL COMMENT '作业执行参数',
    job_log VARCHAR(255) NOT NULL COMMENT '作业执行日志路径',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX unique_id (id),
    INDEX index_job_task_id (job_task_id),
    INDEX index_job_node_id (job_node_id),
    INDEX index_job_status (job_status)
) DEFAULT CHARSET UTF8MB4 COMMENT '节点表';