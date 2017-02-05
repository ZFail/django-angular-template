from django.http import JsonResponse
import json

def isadmin(request):
    return JsonResponse({'is_admin':request.user.is_authenticated() and request.user.is_superuser})

def run(request):
    data = json.loads(request.body.decode("utf-8"))
    print(data)
    res = None
    errors = None
    tb = None

    from io import StringIO
    import sys
    import traceback

    old_stdout = sys.stdout
    sys.stdout = mystdout = StringIO()

    if 'code' in data and data['code']:
        try:
            exec(data['code'])
        except Exception as e:
            errors = str(e)
            tb = traceback.format_exc()

    sys.stdout = old_stdout

    return JsonResponse({'output': mystdout.getvalue(), 'errors': errors, 'traceback': tb})
