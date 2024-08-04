FROM public.ecr.aws/lambda/nodejs:14

# Copy function code and package.json
COPY index.js package.json ${LAMBDA_TASK_ROOT}/

# Install dependencies
RUN npm install

# Set the CMD to handler
CMD [ "index.generateReport" ]
