apiVersion: apps/v1
kind: Deployment
metadata:
  name: p3-user-service-deployment
  namespace: user-profile-system 
  labels: 
    app: p3
    service: user-service
    deployment: uat
spec:
  replicas: 2
  selector:
    matchLabels:
      app: p3
      service: user-service
  template:
    metadata:
      labels:
        app: p3
        service: user-service
    spec:
      containers:
      - name: p3-user-service
        image: gcr.io/alec-2006nodedev/user-service:COMMIT_SHA
        imagePullPolicy: Always
        env:
        - name: AUTH0_CLIENT_ID
          value: "Die6w2itO0GPZd5EDJy8sVCeeoNMVV7U"
        - name: AUTH0_CLIENT_SECRET 
          valueFrom:
            secretKeyRef:
              name: secrets
              key: authPassword 
        ports:
        - containerPort: 2006
        livenessProbe:
          httpGet:
            path: /health
            port: 2006
          initialDelaySeconds: 3
          periodSeconds: 3
        readinessProbe:
          httpGet:
            path: /health
            port: 2006
          initialDelaySeconds: 3
          periodSeconds: 3
